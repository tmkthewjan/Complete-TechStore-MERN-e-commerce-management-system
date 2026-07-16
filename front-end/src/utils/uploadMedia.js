import { createClient } from "@supabase/supabase-js";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0a3N3aG56Y3JyeWl1cWNjbmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTgzMzEsImV4cCI6MjA5OTE3NDMzMX0.5dJZQIRaxuaWGZCWngVW5o5OaCxR7y-AUeHPIfoDbrE";
const url = "https://ptkswhnzcrryiuqccncd.supabase.co";
const supabase = createClient(url, key);

export default function uploadMedia(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file provided");
      return;
    }

    const timestamp = new Date().getTime();
    const filename = timestamp + "_" + file.name;

    supabase.storage
      .from("images")
      .upload(filename, file)
      .then(() => {
        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(filename).data.publicUrl;

        resolve(publicUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}