const btnJob = document.getElementById('btn-job');
const jobForm = document.getElementById('job-form');
const githubForm = document.getElementById('github-form');
const githubResult = document.getElementById('github-result');

jobForm.addEventListener('submit', handleSubmit);
githubForm.addEventListener('submit', searchGithub);

const candidat = {};

function handleSubmit(e) {
  e.preventDefault();
  candidat.firstName = jobForm.elements[0].value;
  candidat.lastName = jobForm.elements[1].value;
  candidat.isProgrammer = jobForm.elements[2].value === 'dev' ? true : false;
  candidat.isCool = true;
  console.log(candidat);
  applyToJob();
}

async function applyToJob() {
  console.log('Recruteur - La décision est en cours...');
  try {
    const result = await startDecisionProcess();
    console.log('result', result);
  } catch (err) {
    console.log('err', err);
  }
}

function startDecisionProcess() {
  return new Promise((resolve, reject) => {
    console.log("Recruteur - Pendant ce temps je reçois d'autres candidats");
    setTimeout(() => {
      if (candidat.isProgrammer && candidat.isCool) {
        resolve('Recruteur - Bienvenue dans notre entreprise !');
      } else {
        reject(
          `Recruteur - Malgré tout l'intérêt de votre candidature, nous sommes au regret de bla bla`
        );
      }
    }, 2000);
  });
}

console.log('Après la fonction applyToJob');
console.log(`Je réponds à d'autres annonces`);

// function searchGithub(e) {
//   e.preventDefault();
//   const account = githubForm.elements[0].value;
//   fetch(`https://api.github.com/users/${account}`)
//     .then((data) => data.json())
//     .then((data) => {
//       console.log(data);
//       githubResult.innerHTML = `<pre><code>${JSON.stringify(data, null, 4)}</code></pre>`;
//     });
// }

async function searchGithub(e) {
  e.preventDefault();
  const account = githubForm.elements[0].value;
  const data = await fetch(`https://api.github.com/users/${account}`);
  console.log('data', data);
  const jsonData = await data.json();
  console.log('jsonData', jsonData);
  githubResult.innerHTML = `<pre><code>${JSON.stringify(
    jsonData,
    null,
    4
  )}</code></pre>`;
}