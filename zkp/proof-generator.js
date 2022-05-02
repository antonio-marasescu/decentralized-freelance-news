const Zokrates = require('zokrates-js/node');
const fs = require('fs');
const BN = require('bn.js');
const sha256 = require('js-sha256').sha256;

const rootFilename = 'root.zok';
const resourcePath = `${__dirname}/resources`;
const rootFilePath = `${resourcePath}/${rootFilename}`;

const compiledOutputPath = `${__dirname}/dist`;
const proofFilePath = `${compiledOutputPath}/proof.json`;
const keyPairFilePath = `${compiledOutputPath}/keypair.json`;

const environmentVerifierPath = process.env.VERIFIER_PATH;

function readUInt128(buffer, offsetBytes) {
  let a = buffer.readUInt32BE(offsetBytes);
  let b = buffer.readUInt32BE(offsetBytes + 4);
  let c = buffer.readUInt32BE(offsetBytes + 8);
  let d = buffer.readUInt32BE(offsetBytes + 12);
  return BigInt(a.toString() + b.toString() + c.toString() + d.toString());
}

async function generateProof() {
  const zokratesProvider = await Zokrates.initialize();
  const source = await fs.promises.readFile(rootFilePath, 'utf8');

  // compilation
  const artifacts = zokratesProvider.compile(source);
  const { PublicKey, PrivateKey } = require('babyjubjub');

  //get PrivateKey object(field, hexstring)
  let sk = PrivateKey.getRandObj().field;
  //get PrivateKey object from field(or hexstring)
  let privKey = new PrivateKey(sk);
  //get PublicKey object from privateKey object
  let pubKey = PublicKey.fromPrivate(privKey);
  console.log(JSON.stringify(privKey));

  console.log('.............................');

  console.log(JSON.stringify(pubKey));

  const publicKey = [pubKey.p.x.n.toString(10), pubKey.p.y.n.toString(10)];
  const privateKey = privKey.s.n.toString(10);
  const someObject = {
    name: 'string',
    identificationNumber: 'stringstrings',
  };
  const str = JSON.stringify(someObject);
  const buffer = Buffer.alloc(64, '0');
  const dataBuffer = Buffer.from(str);
  dataBuffer.copy(buffer, 64 - dataBuffer.length);
  const hexBuffer = buffer.toString('hex');
  const packet1 = hexBuffer.slice(0, 32);
  const packet2 = hexBuffer.slice(32, 64);
  const packet3 = hexBuffer.slice(64, 96);
  const packet4 = hexBuffer.slice(96, 128);

  const packets = [packet1, packet2, packet3, packet4].map((p) => new BN(p, 16).toString(10));
  const secret = [packets[0], packets[1], packets[2], packets[3]]; // number 5

  console.log([packet1, packet2, packet3, packet4]);
  const { witness, output } = zokratesProvider.computeWitness(artifacts, [publicKey, secret, privateKey]);
  const outputObject = JSON.parse(output);
  const hashString1 = outputObject[0][0].toString();
  const hashString2 = outputObject[0][1].toString();
  const numberHash1 = new BN(hashString1);
  const numberHash2 = new BN(hashString2);

  console.log(numberHash1.toString(16) + numberHash2.toString(16));
  console.log(sha256.hex(buffer));
  console.log(sha256(buffer));

  // c6481e22c5ff4164af680b8cfaa5e8ed3120eeff89c4f307c4a6faaae059ce10

  const keypair = zokratesProvider.setup(artifacts.program);
  //
  // // // generate proof
  const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
  // await fs.promises.writeFile(proofFilePath, JSON.stringify(proof));
}

generateProof()
  .then(() => console.log('Compilation was successful.'))
  .catch((error) => console.error('Compilation failure.', error));
