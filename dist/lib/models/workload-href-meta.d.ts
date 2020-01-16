export default class WorkloadHrefMeta {
    modulePath: string;
    className: string;
    static parse(href: string): WorkloadHrefMeta;
    private static parseWorking;
    private static parseSimplePath;
    constructor(modulePath: string, className: string);
}
