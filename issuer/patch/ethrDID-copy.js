function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var r=e(require("ethjs-provider-http")),t=e(require("ethjs-query")),i=e(require("ethjs-contract")),n=e(require("ethr-did-resolver/contracts/ethr-did-registry.json")),o=require("did-jwt"),s=require("did-jwt/lib/Digest"),u=require("buffer"),d=require("ethr-did-resolver"),a=new(0,require("elliptic").ec)("secp256k1"),c=d.delegateTypes.Secp256k1VerificationKey2018,h=function(e){void 0===e&&(e={});var s=function(e){return void 0===e&&(e={}),e.provider?e.provider:e.web3?e.web3.currentProvider:new r(e.rpcUrl||"https://mainnet.infura.io/ethr-did")}(e),u=new t(s),a=e.registry||d.REGISTRY,c=new i(u)(n);if(this.registry=c.at(a),this.address=e.address,!this.address)throw new Error("No address is set for EthrDid");this.did="did:ethr:rsk:testnet:"+this.address,e.signer?this.signer=e.signer:e.privateKey&&(this.signer=o.SimpleSigner(e.privateKey))};h.createKeyPair=function(){var e=a.genKeyPair(),r=e.getPublic("hex"),t=e.getPrivate("hex");return{address:s.toEthereumAddress(r),privateKey:t}},h.prototype.lookupOwner=function(e){void 0===e&&(e=!0);try{return e&&this.owner?this.owner:Promise.resolve(this.registry.identityOwner(this.address)).then(function(e){return e[0]})}catch(e){return Promise.reject(e)}},h.prototype.changeOwner=function(e){try{var r=this;return Promise.resolve(r.lookupOwner()).then(function(t){return Promise.resolve(r.registry.changeOwner(r.address,e,{from:t})).then(function(t){return r.owner=e,t})})}catch(e){return Promise.reject(e)}},h.prototype.addDelegate=function(e,r){void 0===r&&(r={});try{var t=this,i=r.delegateType||c,n=r.expiresIn||86400;return Promise.resolve(t.lookupOwner()).then(function(r){return t.registry.addDelegate(t.address,i,e,n,{from:r})})}catch(e){return Promise.reject(e)}},h.prototype.revokeDelegate=function(e,r){void 0===r&&(r=c);try{var t=this;return Promise.resolve(t.lookupOwner()).then(function(i){return t.registry.revokeDelegate(t.address,r,e,{from:i})})}catch(e){return Promise.reject(e)}},h.prototype.setAttribute=function(e,r,t,i){void 0===t&&(t=86400);try{var n=this;return Promise.resolve(n.lookupOwner()).then(function(o){return n.registry.setAttribute(n.address,d.stringToBytes32(e),function(e,r){if(u.Buffer.isBuffer(r))return"0x"+r.toString("hex");var t=e.match(/^did\/(pub|auth|svc)\/(\w+)(\/(\w+))?(\/(\w+))?$/);return t&&"base64"===t[6]?"0x"+u.Buffer.from(r,"base64").toString("hex"):r.match(/^0x[0-9a-fA-F]*$/)?r:"0x"+u.Buffer.from(r).toString("hex")}(e,r),t,{from:o,gas:i})})}catch(e){return Promise.reject(e)}},h.prototype.createSigningDelegate=function(e,r){void 0===e&&(e=c),void 0===r&&(r=86400);try{var t=h.createKeyPair();return this.signer=o.SimpleSigner(t.privateKey),Promise.resolve(this.addDelegate(t.address,{delegateType:e,expiresIn:r})).then(function(e){return{kp:t,txHash:e}})}catch(e){return Promise.reject(e)}},h.prototype.signJWT=function(e,r){try{if("function"!=typeof this.signer)throw new Error("No signer configured");var t={signer:this.signer,alg:"ES256K-R",issuer:this.did};return r&&(t.expiresIn=r),o.createJWT(e,t)}catch(e){return Promise.reject(e)}},h.prototype.verifyJWT=function(e,r){void 0===r&&(r=this.did);try{return o.verifyJWT(e,{audience:r})}catch(e){return Promise.reject(e)}},module.exports=h;
//# sourceMappingURL=index.js.map