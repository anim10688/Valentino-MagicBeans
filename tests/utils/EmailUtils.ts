import { MailSlurp } from 'mailslurp-client';

export class EmailUtils {
    private mailSlurp: MailSlurp;

    constructor() {
        const apiKey = process.env.MAIL_SLURP_API_KEY;
        if (!apiKey) throw new Error('MAIL_SLURP_API_KEY is not set');

        this.mailSlurp = new MailSlurp({ apiKey });
    }

    public async createInbox() {
        const inbox = await this.mailSlurp.inboxController.createInboxWithDefaults();
        return inbox;
    }

    public async waitForLatestEmail(inboxId: string) {
        const email = await this.mailSlurp.waitForLatestEmail(inboxId, 30000)
        return email;
    }
}