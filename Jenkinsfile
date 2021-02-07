pipeline {
    agent {dockerfile true}
    stages {
        stage('Build'){
            steps {
                echo 'Building'
                dir('frontend'){
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps{
                echo 'Testing'
            }
        }
        stage('Deploy'){
            steps{
                echo 'Deploying'
            }
        }
    }

}