const overlay = document.getElementById('overlay');
const addPostButton = document.querySelector('.add-post-button');
const closeButton = document.getElementById('close-button');
const submitButtonPopup = document.getElementById('submit-post-popup');
const postTitleInputPopup = document.getElementById('post-title-popup');
const postContentInputPopup = document.getElementById('post-content-popup');
const postImageInputPopup = document.getElementById('post-image-popup');
const postsContainer = document.getElementById('posts');

addPostButton.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

submitButtonPopup.addEventListener('click', createPostPopup);

function createPostPopup() {
    const title = postTitleInputPopup.value;
    const content = postContentInputPopup.value;
    const imageFile = postImageInputPopup.files[0];

    if (title && content) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3 class="post-title">${title}</h3>
            <p class="post-content">${content}</p>
            ${imageFile ? `<img src="${URL.createObjectURL(imageFile)}" alt="Post Image" style="max-width: 100%;">` : ''}
            <div class="votes">
                <span class="upvote">▲</span>
                <span class="vote-count">0</span>
                <span class="downvote">▼</span>
            </div>
        `;

        // Update vote count and post order
        const upvoteButton = postElement.querySelector('.upvote');
        const downvoteButton = postElement.querySelector('.downvote');
        const voteCountSpan = postElement.querySelector('.vote-count');

        let voteCount = 0;

        upvoteButton.addEventListener('click', () => {
            voteCount++;
            voteCountSpan.textContent = voteCount;
            toggleVote(upvoteButton);
            downvoteButton.classList.remove('active');

            // Reorder posts based on vote count
            reorderPosts();
        });

        downvoteButton.addEventListener('click', () => {
            voteCount--;
            voteCountSpan.textContent = voteCount;
            toggleVote(downvoteButton);
            upvoteButton.classList.remove('active');

            // Reorder posts based on vote count
            reorderPosts();
        });

        // Add new post element to the top
        postsContainer.insertBefore(postElement, postsContainer.firstChild);

        // Hide overlay
        overlay.style.display = 'none';
    }
}

function reorderPosts() {
    const postElements = Array.from(document.querySelectorAll('.post'));
    postElements.sort((a, b) => {
        const aVoteCount = parseInt(a.querySelector('.vote-count').textContent);
        const bVoteCount = parseInt(b.querySelector('.vote-count').textContent);
        return bVoteCount - aVoteCount;
    });

    // Remove existing posts and reinsert in the sorted order
    postElements.forEach(post => {
        postsContainer.removeChild(post);
        postsContainer.appendChild(post);
    });
}

function toggleVote(button) {
    button.classList.toggle('active');
}