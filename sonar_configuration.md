# First Installation of Jenkins and sonarqube.

# Jenkins Installation steps
sudo apt update
sudo apt install openjdk-17-jre
sudo apt update
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins
sudo apt update

# sonarqube Installation commands
login as root
sudo su -
cd /opt
sudo apt update
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.1.0.73491.zip
unzip sonarqube-10.1.0.73491.zip
sudo cp -r /root/sonarqube-10.1.0.73491 /opt/

sudo adduser sonar
password :admin
sudo visudo
# Add the following line
sonar ALL=(ALL) NOPASSWD:ALL

sudo chown -R sonar:sonar /opt/sonarqube-10.1.0.73491
sudo chmod -R 775 /opt/sonarqube-10.1.0.73491

su - sonar
password: admin
cd /opt/sonarqube-10.1.0.73491/bin/linux-x86-64
./sonar.sh start
./sonar.sh status

# To access the sonarqube UI = ip:9000
username: admin
password: sonar

# To generate token
Administration -> security-> users -> token ->give a name and duration and click on generate.

# Configuring the token in Jenkins
goto manageJenkins -> system -> search for sonar -> give the name,ip-address,add-server-authentication-token
# to add-server-authentication-token 
select secret -> paste the token -> give any name and description and save it and select the name give under the 
Server authentication token

# Configuration changes in package.json
add "sonar-scanner": "sonar-scanner" 

# add sonar-project.properties file in your React/Node project
sonar.projectKey=nodejs-api
sonar.projectName=nodejs-api
sonar.projectVersion 1.0
sonar.sources=.
sonar.sourceEncoding=UTF-8
sonar.host.url=http://13.234.23.179:9000/
sonar.login=squ_8b9fa4d283c706508eec2325a4c3e0919db56b79

# Pipeline script

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







