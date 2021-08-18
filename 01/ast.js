"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionCall = exports.FunctionBody = exports.FunctionDeclare = exports.Program = exports.Statement = void 0;
// ast节点
class AstNode {
}
// 语句节点
class Statement extends AstNode {
}
exports.Statement = Statement;
// 程序节点
class Program extends AstNode {
    constructor(statements) {
        super();
        this.statements = statements;
    }
    dump(prefix) {
        console.info(prefix + 'Program');
        this.statements.forEach(v => v.dump(prefix + '\t'));
    }
}
exports.Program = Program;
// 函数声明节点
class FunctionDeclare extends Statement {
    constructor(name, body) {
        super();
        this.name = name;
        this.body = body;
    }
    dump(prefix) {
        console.info(prefix + 'FunctionDeclare ' + this.name);
        this.body.dump(prefix + '\t');
    }
}
exports.FunctionDeclare = FunctionDeclare;
// 函数体节点
class FunctionBody extends Statement {
    constructor(statement) {
        super();
        this.statement = statement;
    }
    dump(prefix) {
        console.info('FunctionBody ');
        this.statement.forEach(v => v.dump(prefix + '\t'));
    }
}
exports.FunctionBody = FunctionBody;
// 函数调用节点
class FunctionCall extends Statement {
    constructor(name, parameters) {
        super();
        this.declare = null;
        this.name = name;
        this.parameters = parameters;
    }
    dump(prefix) {
        console.info(prefix + "FunctionCall " + this.name + (this.declare === null ? ", not resolved" : ", resolved"));
        this.parameters.forEach(v => console.info(prefix + "\t" + "Parameter: " + v));
    }
}
exports.FunctionCall = FunctionCall;
