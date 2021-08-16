"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.FunctionCall = exports.FunctionBody = exports.FunctionDeclare = exports.Program = exports.Statement = void 0;
// ast节点
var AstNode = /** @class */ (function () {
    function AstNode() {
    }
    return AstNode;
}());
// 语句节点
var Statement = /** @class */ (function (_super) {
    __extends(Statement, _super);
    function Statement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Statement;
}(AstNode));
exports.Statement = Statement;
// 程序节点
var Program = /** @class */ (function (_super) {
    __extends(Program, _super);
    function Program(statements) {
        var _this = _super.call(this) || this;
        _this.statements = statements;
        return _this;
    }
    Program.prototype.dump = function (prefix) {
        console.info(prefix + 'Program');
        this.statements.forEach(function (v) { return v.dump(prefix + '\t'); });
    };
    return Program;
}(AstNode));
exports.Program = Program;
// 函数声明节点
var FunctionDeclare = /** @class */ (function (_super) {
    __extends(FunctionDeclare, _super);
    function FunctionDeclare(name, body) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.body = body;
        return _this;
    }
    FunctionDeclare.prototype.dump = function (prefix) {
        console.info(prefix + 'FunctionDeclare ' + this.name);
        this.body.dump(prefix + '\t');
    };
    return FunctionDeclare;
}(Statement));
exports.FunctionDeclare = FunctionDeclare;
// 函数体节点
var FunctionBody = /** @class */ (function (_super) {
    __extends(FunctionBody, _super);
    function FunctionBody(statement) {
        var _this = _super.call(this) || this;
        _this.statement = statement;
        return _this;
    }
    FunctionBody.prototype.dump = function (prefix) {
        console.info('FunctionBody ');
        this.statement.forEach(function (v) { return v.dump(prefix + '\t'); });
    };
    return FunctionBody;
}(Statement));
exports.FunctionBody = FunctionBody;
// 函数调用节点
var FunctionCall = /** @class */ (function (_super) {
    __extends(FunctionCall, _super);
    function FunctionCall(name, parameters) {
        var _this = _super.call(this) || this;
        _this.declare = null;
        _this.name = name;
        _this.parameters = parameters;
        return _this;
    }
    FunctionCall.prototype.dump = function (prefix) {
        console.info(prefix + "FunctionCall " + this.name + (this.declare === null ? ", not resolved" : ", resolved"));
        this.parameters.forEach(function (v) { return console.info(prefix + "\t" + "Parameter: " + v); });
    };
    return FunctionCall;
}(Statement));
exports.FunctionCall = FunctionCall;
