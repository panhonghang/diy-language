// ast节点
abstract class AstNode {
    // 打印对象信息
    public abstract dump(prefix:string):void;
}
// 语句节点
export abstract class Statement extends AstNode {
    public name?: string;
    public body?: FunctionBody;
    public parameters?: string[];
    public statement?: FunctionCall[];
}
// 程序节点
export class Program extends AstNode {
    public statements: Statement[];
    constructor(statements: Statement[]) {
        super();
        this.statements = statements;
    }
    public dump(prefix: string): void {
        console.info(prefix + 'Program');
        this.statements.forEach(v => v.dump(prefix+'\t'));
    }
}
// 函数声明节点
export class FunctionDeclare extends Statement {
    public name: string;
    public body: FunctionBody;
    constructor(name: string, body: FunctionBody) {
        super();
        this.name = name;
        this.body = body;
    }
    public dump(prefix: string): void {
        console.info(prefix + 'FunctionDeclare ' + this.name);
        this.body.dump(prefix + '\t');
    }
}
// 函数体节点
export class FunctionBody extends Statement {
    public statement: FunctionCall[];
    constructor(statement: FunctionCall[]) {
        super();
        this.statement = statement;
    }
    public dump(prefix: string): void {
        console.info('FunctionBody ');
        this.statement.forEach(v => v.dump(prefix + '\t'));
    }
}

// 函数调用节点
export class FunctionCall extends Statement {
    public name: string;
    public parameters: string[];
    private declare: FunctionDeclare | null = null;
    constructor(name: string, parameters: string[]) {
        super();
        this.name = name;
        this.parameters = parameters;
    }
    public dump(prefix: string): void {
        console.info(prefix + "FunctionCall " + this.name + (this.declare === null ? ", not resolved" : ", resolved"));
        this.parameters.forEach(v => console.info(prefix + "\t"+"Parameter: "+ v));
    }
}