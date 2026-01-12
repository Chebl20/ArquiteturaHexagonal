
export interface NotificationService {
    send(message: string): Promise<void>;
  }
  