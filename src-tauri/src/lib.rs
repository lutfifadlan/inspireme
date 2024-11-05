use base64::engine::general_purpose::STANDARD;
use base64::Engine;
use std::fs;
use tauri::Manager;

mod commands {
    use super::*;

    #[tauri::command]
    pub async fn save_wallpaper(
        app: tauri::AppHandle,
        image_data: String,
        file_name: String,
    ) -> Result<String, String> {
        println!("Starting save_wallpaper command");

        // Remove the "data:image/png;base64," prefix if present
        let base64_data = image_data.replace("data:image/png;base64,", "");
        println!("Base64 data length: {}", base64_data.len());

        // Decode base64 to bytes using the new API
        let image_bytes = STANDARD.decode(base64_data).map_err(|e| {
            println!("Failed to decode base64: {}", e);
            format!("Failed to decode base64: {}", e)
        })?;
        println!("Decoded image bytes length: {}", image_bytes.len());

        // Get the download directory using the app handle
        let download_path = app.path().download_dir().map_err(|e| {
            println!("Failed to get download directory: {}", e);
            format!("Failed to get download directory: {}", e)
        })?;
        println!("Download path: {:?}", download_path);

        // Create the full file path
        let file_path = download_path.join(file_name);
        println!("Full file path: {:?}", file_path);

        // Write the file
        fs::write(&file_path, image_bytes).map_err(|e| {
            println!("Failed to write file: {}", e);
            format!("Failed to write file: {}", e)
        })?;
        println!("File written successfully");

        Ok(file_path.to_string_lossy().into_owned())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::save_wallpaper])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
