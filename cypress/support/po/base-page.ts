export abstract class Page {
    public url: string = '';

    public abstract getAllElementVisible(): void;
}
