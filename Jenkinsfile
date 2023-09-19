pipeline {
    agent any

    environment {
        PATH = "$PATH:/usr/bin/node"
    }

    stages {
        stage('GetCode') {
            steps {
                git branch: 'main', url: 'https://github.com/giridharpatnaik183/node-api-test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh "npm install sonar-scanner"
                    sh "npm run sonar-scanner"
                }
            }
        }
    }
}
