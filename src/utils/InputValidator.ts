export class InputValidator {
    private static sqlInjectionRegex =
        /('|--|;|\/\*|\*\/|\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b)/i;

    private static htmlTagRegex = /<[^>]*>/g;
    private static scriptTagRegex =
        /<\s*script[^>]*>.*?<\s*\/\s*script>/gis;

    private static emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    private static phoneRegex =
        /^\+?[1-9]\d{7,14}$/;

    static hasSqlInjection(input: string): boolean {
        return this.sqlInjectionRegex.test(input);
    }

    static hasHtmlTag(input: string): boolean {
        return this.htmlTagRegex.test(input);
    }

    static hasScriptTag(input: string): boolean {
        return this.scriptTagRegex.test(input);
    }

    static isValidEmail(email: string): boolean {
        return this.emailRegex.test(email);
    }

    static isValidPhone(phone: string): boolean {
        return this.phoneRegex.test(phone);
    }
}
