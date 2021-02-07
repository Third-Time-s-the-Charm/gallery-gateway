pipeline {
    agent {dockerfile true}
    stages {
        stage('Build'){
            steps {
                echo 'Building'
                sh 'cd frontend'
                sh 'ls'
                sh 'npm install'
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