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
    alert("Please enter a video prompt.");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "⏳ Generating...";

  try {
    const response = await fetch("PASTE_YOUR_API_LINK_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        duration: document.getElementById("duration").value
      })
    });

    const data = await response.json();

    if (data.videoUrl) {
      videoPlayer.src = data.videoUrl;
      videoPlayer.style.display = "block";
      placeholder.style.display = "none";
      downloadBtn.style.display = "block";
      statusBox.textContent = "Video generated successfully!";
    } else {
      statusBox.textContent = data.message || "Video generation failed.";
    }

  } catch (error) {
    console.error(error);
    statusBox.textContent = "Unable to connect to the AI video API.";
  }

  generateBtn.disabled = false;
  generateBtn.textContent = "✨ Generate Video";
});
  

  
    
      
    
  

  
  
  

  
  

  
    `

  

  
    
    

    

  

  



  
    
    

  generateBtn.disabled = false;
  generateBtn.textContent = "✨ Generate Video";
});
  
  
  

  
    




  
    
  


  
  

  
    
  
    
  





  




  

                          

   
    

    
        
  


  
  

  
    
  
    
  

  


    
      
    



  
    
