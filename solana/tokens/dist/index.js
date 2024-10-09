"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
function airdrop(publicKey, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const airdropSignature = yield connection.requestAirdrop(publicKey, amount);
        yield connection.confirmTransaction(airdropSignature);
    });
}
airdrop(new web3_js_1.PublicKey("58VjvqXEtaynySFuRtoYUn5V6kJeXNFQxf45agiLGYe3"), web3_js_1.LAMPORTS_PER_SOL).then(() => {
    console.log("Airdrop successful");
});
//# sourceMappingURL=index.js.map