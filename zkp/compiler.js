const Zokrates = require('zokrates-js/node');
const fs = require('fs');

const rootFilename = 'root.zok';
const resourcePath = `${__dirname}/resources`;
const rootFilePath = `${resourcePath}/${rootFilename}`;

const compiledOutputPath = `${__dirname}/dist`;
const artifactsFilePath = `${compiledOutputPath}/artifacts.json`;
const proofFilePath = `${compiledOutputPath}/proof.json`;
const keyPairFilePath = `${compiledOutputPath}/keypair.json`;

const environmentVerifierPath = process.env.VERIFIER_PATH;
const solidityVerifierPath = environmentVerifierPath || `${compiledOutputPath}/verifier.sol`;

async function compile() {
  const zokratesProvider = await Zokrates.initialize();
  const source = await fs.promises.readFile(rootFilePath, 'utf8');

  // compilation
  const artifacts = zokratesProvider.compile(source);
  await fs.promises.writeFile(artifactsFilePath, JSON.stringify(artifacts));

  // computation
  const { witness, output } = zokratesProvider.computeWitness(artifacts, ['2', '4']);

  // run setup
  const keypair = zokratesProvider.setup(artifacts.program);
  await fs.promises.writeFile(keyPairFilePath, JSON.stringify(keypair));

  // generate proof
  const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
  await fs.promises.writeFile(proofFilePath, JSON.stringify(proof));
  //
  // export solidity verifier
  const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);
  await fs.promises.writeFile(solidityVerifierPath, verifier.toString(), { encoding: 'utf8' });
  //
  // // or verify off-chain
  // const isVerified = zokratesProvider.verify(keypair.vk, proof);
}

compile()
  .then(() => console.log('Compilation was successful.'))
  .catch((error) => console.error('Compilation failure.', error));
