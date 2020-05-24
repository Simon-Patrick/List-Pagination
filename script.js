/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global variables, one to store the full list of students and one to store items per page
const listItems = document.querySelector('ul').children;
const itemsPerPage = 10;

/***
   Function to show the results depending on which page is passed in
   I have added 2 parameters to the function but not sure why, the global
   variable is available inside the function so seems a bit pointless passing it in but I 
   have done it as in the requirements.
 ***/
function showPage(page, listItems) {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   // End index needs -1 as index starts at 0 and so to show 10 results need to end at 9
   let endIndex = (page * itemsPerPage) - 1;
   for(let i = 0; i < listItems.length; i++) {
      if(!(i >= startIndex && i <= endIndex)) {
         listItems[i].setAttribute('style', 'display:none;');
      }
      else {
         listItems[i].setAttribute('style', 'display:"";');
      }
   }
}


/*** 
   Function runs on page load so that the first 10 results are always shown
   The function adds the list items based on the number of students with 10 per
   page. When you click the pagination links it calls the show page function while also 
   looping over the anchor tags and adding or removing the active class
***/
window.onload = function appendPageLinks() {
   pageLinks = Math.ceil((listItems.length / itemsPerPage));
   const ul = document.querySelector('ul');
   const div = document.createElement('div');
   const newUl = document.createElement('ul')
   div.classList.add('pagination');
   div.appendChild(newUl);
   ul.insertAdjacentElement('afterend', div);
   // On first page load call the showPage function and pass in 1 so only the first 10 results show
   this.showPage(1, listItems);
   for(let i = 1; i <= pageLinks; i++) {
      let li = document.createElement('li');
      newUl.appendChild(li);
      if(i === 1) {
         li.innerHTML = `<a class="active" href="#">${i}</a>`;
      } else {
         li.innerHTML = `<a href="#">${i}</a>`;
      }
   }
   let anchorTags = document.querySelectorAll('li>a');
   newUl.addEventListener('click', function(e) {
      let page = parseInt(e.target.text);
      for(let i = 0; i < anchorTags.length; i++) {
         if(page  === i + 1) {
            anchorTags[i].classList.add('active');
         } else {
            anchorTags[i].classList.remove('active');         
         }
      }
      showPage(page, listItems);
   });
}
   