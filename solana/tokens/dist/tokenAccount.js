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
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const payer = web3_js_1.Keypair.fromSecretKey(Uint8Array.from([21, 131, 15, 61, 112, 42, 116, 203, 94, 84, 233, 227, 24, 166, 206, 199, 5, 131, 20, 129, 151, 17, 93, 44, 224, 119, 68, 206, 35, 212, 130, 128, 61, 90, 79, 88, 238, 50, 24, 153, 21, 101, 231, 186, 149, 130, 40, 100, 189, 69, 56, 179, 162, 128, 176, 39, 109, 36, 178, 39, 199, 186, 215, 40]));
const mintAthority = payer;
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
function createMintForToken(payer, mintAuthority) {
    return __awaiter(this, void 0, void 0, function* () {
        const mint = yield (0, spl_token_1.createMint)(connection, payer, mintAuthority, null, 0);
        console.log('Mint Created at : ', mint.toBase58());
        return mint;
    });
}
function mintNewTokens(mint, to, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, payer, mint, new web3_js_1.PublicKey(to));
        yield (0, spl_token_1.mintTo)(connection, payer, mint, tokenAccount.address, payer, amount);
        console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const mint = yield createMintForToken(payer, mintAthority.publicKey);
        yield mintNewTokens(mint, payer.publicKey, 100);
    });
}
main();
//# sourceMappingURL=tokenAccount.js.map