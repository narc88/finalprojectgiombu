$(document).ready(function() {
            status('Choose a file !');
            // Check to see when a user has selected a file                                                                                                                
            var timerId;
            timerId = setInterval(function() {
                if($('#userImageInput').val() !== '') {
                    clearInterval(timerId);
                     $('#uploadForm').submit();
                }
            }, 500);

           $('#uploadForm').submit(function() {
                         alert('moñoño');
                        status('uploading the file ...');
                        $('#uploadForm').ajaxSubmit({                                                                                                                 
                            error: function(xhr) {
                                alert("ERROR");
                                 status('Error: ' + xhr.status);
                            },
                            success: function(response) {
                                 alert("EXITO");
                            //TODO: We will fill this in later
                                if(response.error){
                                    alert(response.error);
                                    status('Something went wrong.');
                                    return;
                                }
                                
                                var imgUrl = response.path;
                                 status('Success, file uploaded to:' + imgUrl);
                                $('#uploadedImage').attr({'src':imgUrl});
                                $('#uploadedImage').show();
                                var jcrop_api;
                                var bounds, boundx, boundy;
                                
                                $('#uploadedImage').Jcrop({
                                    onChange: showPreview,
                                    onSelect: showPreview,
                                    onRelease: disablePreview
                                }, function(){
                                    jcrop_api = this;
                                });

                                var info = {};

                                function disablePreview()
                                {
                                    $('#sendCrop').attr('disabled', 'disabled')
                                }

                                function showPreview(coords)
                                {
                                    info = coords;
                                    $('#sendCrop').removeAttr('disabled');
                                };
                                alert(imgUrl);
                                $('#sendCrop').click(function(){
                                    $.ajax({
                                        type: "POST",
                                        url: "/images/crop",
                                        data: {'src':imgUrl, 'name':imgUrl.substr(imgUrl.lastIndexOf("/") + 1), 'data':info},
                                        success: function(res){
                                            if(res == "success")
                                            {
                                              status('Image Cropped');
                                              jcrop_api.destroy();
                                              $('#uploadedImage').removeAttr('src');
                                              $('#uploadedImage').hide();
                                              disablePreview();
                                                $('#userImageInput').val('');
                                                 timerId = setInterval(function() {
                                                    if($('#userImageInput').val() !== '') {
                                                        clearInterval(timerId);
                                                        $('#uploadForm').submit();
                                                    }
                                                }, 500);
                                            }
                                            else
                                            {
                                              status('Err' + res);   
                                            }
                                        }

                                    })
                                });
                            }
                        });

                        // Have to stop the form from submitting and causing                                                                                                       
                        // a page refresh - don't forget this                                                                                                                      
                        return false;
                    });

            function status(message) {
               $('#status').text(message);
            }
        });