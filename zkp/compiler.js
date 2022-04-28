const Zokrates = require('zokrates-js/node');
const fs = require('fs');

const rootFilename = 'root.zok';
const resourcePath = `${__dirname}/resources`;
const rootFilePath = `${resourcePath}/${rootFilename}`;

const compiledOutputPath = `${__dirname}/dist`;
const keyPairFilePath = `${compiledOutputPath}/keypair.json`;

const environmentVerifierPath = process.env.VERIFIER_PATH;
const solidityVerifierPath = environmentVerifierPath || `${compiledOutputPath}/verifier.sol`;

async function compile() {
  const zokratesProvider = await Zokrates.initialize();
  const source = await fs.promises.readFile(rootFilePath, 'utf8');

  // compilation
  const artifacts = zokratesProvider.compile(source);

  // // run setup
  const keypair = zokratesProvider.setup(artifacts.program);
  await fs.promises.writeFile(keyPairFilePath, JSON.stringify(keypair));

  // // export solidity verifier
  const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);
  await fs.promises.writeFile(solidityVerifierPath, verifier.toString(), { encoding: 'utf8' });
}

compile()
  .then(() => console.log('Compilation was successful.'))
  .catch((error) => console.error('Compilation failure.', error));
