pipeline {
    agent {dockerfile true}
    stages {
        stage('Build'){
            steps {
                echo 'Building'
                sh 'docker ps'
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