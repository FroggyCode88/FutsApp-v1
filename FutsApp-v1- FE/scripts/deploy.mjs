import FtpDeploy from 'ftp-deploy';

export default async function deploy() {
  const ftpDeploy = new FtpDeploy();

  const config = {
    host: process.env.FTP_HOST,
    port: Number(process.env.FTP_PORT) || 21,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    localRoot: process.env.LOCAL_PATH,
    remoteRoot: process.env.REMOTE_PATH,
    include: ['*', '**/*'], // include all files
    deleteRemote: false,      // set to true to remove files at remote not present locally
    forcePasv: true           // passive mode
  };

  console.log('🚀 Starting FTP deploy with config:', {
    host: config.host,
    remoteRoot: config.remoteRoot,
    localRoot: config.localRoot
  });

  try {
    const summary = await ftpDeploy.deploy(config);
    console.log('FTP Deploy summary:', summary);
  } catch (error) {
    throw error;
  }
}