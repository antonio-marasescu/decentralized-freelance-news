export class FileUtils {
  static makeJsonFileFromObject(data: unknown): Blob {
    return new Blob([JSON.stringify(data)], { type: '.json' });
  }

  static makeFileFromString(data: string, type: string): Blob {
    return new Blob([data], { type });
  }

  static downloadFile(blob: Blob, filename: string): void {
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  static async readFileContentAsJson<T>(file: File): Promise<T> {
    const fileText = await file.text();
    return JSON.parse(fileText) as T;
  }

  static async readFileContentAsText(file: File): Promise<string> {
    return file.text();
  }
}
