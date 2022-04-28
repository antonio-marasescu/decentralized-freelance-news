const Zokrates = require('zokrates-js/node');
const fs = require('fs');
const BN = require('bn.js');

const rootFilename = 'root.zok';
const resourcePath = `${__dirname}/resources`;
const rootFilePath = `${resourcePath}/${rootFilename}`;

const compiledOutputPath = `${__dirname}/dist`;
const proofFilePath = `${compiledOutputPath}/proof.json`;
const keyPairFilePath = `${compiledOutputPath}/keypair.json`;

const environmentVerifierPath = process.env.VERIFIER_PATH;

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

  const publicKey = [pubKey.p.x.n.toString(10), pubKey.p.y.n.toString(10)];
  const privateKey = privKey.s.n.toString(10);
  const secret = [`0`, '0', '0', '4']; // number 4

  const { witness, output } = zokratesProvider.computeWitness(artifacts, [publicKey, secret, privateKey]);
  console.log(output);

  // // // run setup
  // const keypairFileData = await fs.promises.readFile(keyPairFilePath, 'utf8');
  // const keypair = JSON.parse(keypairFileData);
  //
  // // // generate proof
  // const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
  // await fs.promises.writeFile(proofFilePath, JSON.stringify(proof));
}

generateProof()
  .then(() => console.log('Compilation was successful.'))
  .catch((error) => console.error('Compilation failure.', error));
