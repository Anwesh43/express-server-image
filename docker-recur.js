var childProcess = require('child_process')
if(process.argv.length == 3) {
    var image_id_str = process.argv[2]
    var dockerRMI = function(){
      childProcess.exec(`docker rmi ${image_id_str}`,function(err,stdout,stderr){
        if(err == null) {
            console.log(stdout)
        }
        else {
           console.log(stderr)
           var errParts = stderr.split(':')
           if(errParts[1].trim() == "No such image") {
              console.log("please enter a valid image name")
           }
           else if(errParts[2].trim().indexOf("unable to delete")!=-1) {
              var errMsg = errParts[2].trim()
              var errMsgTokens = errMsg.split(' ')
              var containerId = errMsgTokens[errMsgTokens.length-1]
              console.log(containerId)
              childProcess.exec(`docker rm ${containerId}`,function(err,stdout,stderr){
                  if(err == null) {
                      dockerRMI()
                  }
                  else {
                      console.log(stderr)
                      console.log(`error in removing the container ${containerId}`)
                  }
              })
           }

        }
      })
    }
    dockerRMI()
}
else {
    console.log(`you have given ${process.argv.length} arguments`)
}
