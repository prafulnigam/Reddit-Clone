const overlay = document.getElementById("overlay");
const addPostButton = document.querySelector(".add-post-button");
const closeButton = document.getElementById("close-button");
const submitButtonPopup = document.getElementById("submit-post-popup");
const postTitleInputPopup = document.getElementById("post-title-popup");
const postContentInputPopup = document.getElementById("post-content-popup");
const postImageInputPopup = document.getElementById("post-image-popup");
const postsContainer = document.getElementById("posts");

addPostButton.addEventListener("click", () => {
  overlay.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  overlay.style.display = "none";
});

submitButtonPopup.addEventListener("click", createPostPopup);
let currentEditedPost = null;
function createPostPopup() {
  const title = postTitleInputPopup.value;
  const content = postContentInputPopup.value;
  const imageFile = postImageInputPopup.files[0];

  if (title && content) {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
            <div class="newpost">
                <h3 class="post-title">${title}</h3><hr>
                <p class="post-content">${content}</p>
                ${
                  imageFile
                    ? `<img src="${URL.createObjectURL(
                        imageFile
                      )}" alt="Post Image" style="max-width: 100%;">`
                    : ""
                }
                <div class="votes">
                    <span class="upvote"><i class="fa-solid fa-up-long" style="color: white;"></i></span>
                    <span class="vote-count">0</span>
                    <span class="downvote"><i class="fa-solid fa-down-long" style="color: white;"></i></span>
                    <button class="edit-button" title="Edit"><i class="fa-solid fa-pen-to-square fa-xl" style="color: white;"></i></button>
                    <button class="delete-button" title="Delete"><i class="fa-regular fa-trash-can fa-xl" style="color: white;"></i></button>
                </div>
            </div>
        `;

        const editButton = postElement.querySelector(".edit-button");
        editButton.addEventListener("click", () => {
          currentEditedPost = postElement; // Set the current edited post
          editPost(postElement);
        });
    const deleteButton = postElement.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      deletePost(postElement);
    });

    function deletePost(postElement) {
      postsContainer.removeChild(postElement);
    }

    // Update vote count and post order
    const upvoteButton = postElement.querySelector(".upvote");
    const downvoteButton = postElement.querySelector(".downvote");
    const voteCountSpan = postElement.querySelector(".vote-count");

    let voteCount = 0;

    upvoteButton.addEventListener("click", () => {
      voteCount++;
      voteCountSpan.textContent = voteCount;
      toggleVote(upvoteButton);
      downvoteButton.classList.remove("active");

      // Reorder posts based on vote count
      reorderPosts();
    });

    downvoteButton.addEventListener("click", () => {
      voteCount--;
      voteCountSpan.textContent = voteCount;
      toggleVote(downvoteButton);
      upvoteButton.classList.remove("active");

      // Reorder posts based on vote count
      reorderPosts();
    });

    // Add new post element to the top
    postsContainer.insertBefore(postElement, postsContainer.firstChild);

    // Hide overlay
    overlay.style.display = "none";
  }
}

function reorderPosts() {
  const postElements = Array.from(document.querySelectorAll(".post"));
  postElements.sort((a, b) => {
    const aVoteCount = parseInt(a.querySelector(".vote-count").textContent);
    const bVoteCount = parseInt(b.querySelector(".vote-count").textContent);
    return bVoteCount - aVoteCount;
  });

  // Remove existing posts and reinsert in the sorted order
  postElements.forEach((post) => {
    postsContainer.removeChild(post);
    postsContainer.appendChild(post);
  });
}

function toggleVote(button) {
  button.classList.toggle("active");
}

function saveEditedPost() {
  if (currentEditedPost) {
    const title = postTitleInputPopup.value;
    const content = postContentInputPopup.value;

    if (title && content) {
      const postTitle = currentEditedPost.querySelector(".post-title");
      const postContent = currentEditedPost.querySelector(".post-content");

      postTitle.textContent = title;
      postContent.textContent = content;

      // Switch button back to creating new post
      submitButtonPopup.textContent = "Submit";
      submitButtonPopup.removeEventListener("click", saveEditedPost);
      submitButtonPopup.addEventListener("click", createPostPopup);

      overlay.style.display = "none";

      // Reset the currentEditedPost
      currentEditedPost = null;
    }
  }
}

function editPost(postElement) {
  overlay.style.display = "flex";

  const postTitle = postElement.querySelector(".post-title").textContent;
  const postContent = postElement.querySelector(".post-content").textContent;

  const editTitleInput = document.getElementById("post-title-popup");
  const editContentInput = document.getElementById("post-content-popup");

  editTitleInput.value = postTitle;
  editContentInput.value = postContent;

  submitButtonPopup.textContent = "Save";
  submitButtonPopup.removeEventListener("click", createPostPopup);
  submitButtonPopup.addEventListener("click", saveEditedPost);
}

addPostButton.addEventListener("click", () => {
  // Clear the title and content input fields
  postTitleInputPopup.value = "";
  postContentInputPopup.value = "";

  overlay.style.display = "flex";
});


function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
}
}