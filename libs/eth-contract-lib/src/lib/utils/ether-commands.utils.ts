export class EtherCommandsUtils {
  static async sendCommand(provider: any, method: string, params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      provider.send({ method, params }, (error: any, response: any) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }
}
