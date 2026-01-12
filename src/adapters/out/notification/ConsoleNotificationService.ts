
import { NotificationService } from "@/application/ports/out/NotificationService";

export class ConsoleNotificationService implements NotificationService {
  async send(message: string): Promise<void> {
    console.log(`[NOTIFICATION]: ${message}`);
  }
}
