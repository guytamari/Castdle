pipline {
   agent any
   environment {
        REACT_EC2_IP = '10.0.5.17'
        }
   stages {
	stage('Deploy Castdle App'){
	   steps {
             script {
                sh '''
                echo "hello"
		ssh ec2-user@${REACT_EC2_IP} "
                cd Castdle
                git pull origin main
                docker build -t castdle-image .
		docker stop castdle || true
		docker rm castdle || true
		docker run -d -p 80:3000 -restart always --name castdle castdle-image:latest
              "
	      '''
		}
	}
       }
     }
   }