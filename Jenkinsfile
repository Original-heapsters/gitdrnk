pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building gitdrnk backend...'
                fileOperations([fileCopyOperation(
                  excludes: '',
                  flattenFiles: false,
                  includes: "${WORKSPACE}/backend/dockerfiles/Dockerfile_reg",
                  targetLocation: "${WORKSPACE}/backend/Dockerfile"
                )])
                return docker.build("sellnat77/gitdrnk", "-f backend/Dockerfile .")
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
