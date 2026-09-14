const generateBtn = document.getElementById("generateBtn");
const promptBox = document.getElementById("prompt");
const statusBox = document.getElementById("status");

const videoPlayer = document.getElementById("videoPlayer");
const placeholder = document.getElementById("placeholder");
const downloadBtn = document.getElementById("downloadBtn");

window.login = function () {
  const username = prompt("Enter Login ID:");
  const password = prompt("Enter Password:");

  const cleanUsername = username ? username.trim().toLowerCase() : "";
  const cleanPassword = password ? password.trim() : "";

  if (cleanUsername === "cyokems" && cleanPassword === "151086") {
    alert("Login successful! Welcome to CYOKEMS AI VIDEO STUDIO.");
  } else {
    alert("Incorrect Login ID or Password.");
  }
};

  
  


  
  
    
  


// VIDEO GENERATOR
generateBtn.addEventListener("click", async () => {
  const prompt = promptBox.value.trim();

  if (!prompt) {
    statusBox.textContent =
      "Please describe the video you want to create.";
    return;
  }

  const style = document.getElementById("style").value;
  const ratio = document.getElementById("ratio").value;
  const duration = document.getElementById("duration").value;

  generateBtn.disabled = true;
  generateBtn.textContent = "⏳ Generating...";

  statusBox.textContent =
    `Preparing your ${style} video (${ratio}, ${duration}s)...`;

  await new Promise(resolve => setTimeout(resolve, 3000));

  statusBox.textContent =
    "The video generator interface is ready. Next we connect the real AI video API.";

  generateBtn.disabled = false;
  generateBtn.textContent = "✨ Generate Video";
});
  
  
  

  
    




  
    
  


  
  

  
    
  
    
  





  




  

                          

   
    

    
        
  


  
  

  
    
  
    
  

  


    
      
    



  
    
