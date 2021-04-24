pipeline {
  agent { docker 'node:14.16.0' }
  stages {
    stage('build') {
      steps {
        sh 'npm --version'
        sh 'npm config set https: //registry.npm.taobao.org'
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
}