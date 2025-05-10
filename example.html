<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<title>Senior High Strand Recommender</title>
<style>
  /* Reset and basic */
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 10px;
  }
  #app {
    background-color: rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    max-width: 350px;
    max-height: 600px;
    overflow: auto;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
  }
  h1 {
    margin-bottom: 0.3em;
    font-weight: 700;
    font-size: 1.8rem;
    text-align: center;
    text-shadow: 0 0 6px #2575fc;
  }
  p.subtitle {
    text-align: center;
    color: #a0c4ff;
    margin-top: 0;
    margin-bottom: 1.5em;
    font-weight: 500;
  }
  .question {
    margin-bottom: 1.2em;
  }
  .question h2 {
    font-size: 1.1rem;
    margin-bottom: 0.7em;
    text-shadow: 0 0 3px #2575fc;
  }
  label {
    display: block;
    margin-bottom: 0.6em;
    cursor: pointer;
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
    padding: 8px 12px;
    transition: background 0.3s;
    user-select: none;
  }
  input[type="radio"] {
    margin-right: 8px;
    accent-color: #2575fc;
    vertical-align: middle;
  }
  label:hover {
    background: rgba(37,117,252,0.3);
  }
  button {
    background-color: #2575fc;
    border: none;
    padding: 12px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    margin-top: auto;
    box-shadow: 0 4px 10px #6a11cb;
    transition: background-color 0.3s;
  }
  button:disabled {
    background-color: #555;
    cursor: not-allowed;
    box-shadow: none;
  }
  button:hover:not(:disabled) {
    background-color: #184bcf;
  }
  #result {
    margin-top: 20px;
    background: rgba(37,117,252,0.15);
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 0 15px #2575fc;
  }
  #result h2 {
    margin-top: 0;
  }
  #result p {
    font-size: 1rem;
    line-height: 1.4;
  }
  @media (max-height: 600px) {
    #app {
      max-height: 100vh;
    }
  }
</style>
</head>
<body>
<div id="app" role="main" aria-live="polite">
  <h1>Senior High Strand Recommender</h1>
  <p class="subtitle">Answer the questions to find the best strand for you!</p>
  <form id="questionForm" aria-describedby="instructions">
    <div class="question" data-qid="1">
      <h2>1. What do you enjoy the most?</h2>
      <label><input type="radio" name="q1" value="logic"> Solving complex math problems or scientific experiments</label>
      <label><input type="radio" name="q1" value="business"> Handling business or money-related tasks</label>
      <label><input type="radio" name="q1" value="writing"> Writing essays, stories, or discussing social issues</label>
      <label><input type="radio" name="q1" value="handsOn"> Working with tools, crafts, or cooking</label>
    </div>

    <div class="question" data-qid="2">
      <h2>2. Which subject do you prefer at school?</h2>
      <label><input type="radio" name="q2" value="logic"> Mathematics or Science</label>
      <label><input type="radio" name="q2" value="business"> Economics or Accountancy</label>
      <label><input type="radio" name="q2" value="writing"> Social Studies or Literature</label>
      <label><input type="radio" name="q2" value="handsOn"> Technology or Home Economics</label>
    </div>

    <div class="question" data-qid="3">
      <h2>3. What kind of activities do you enjoy outside school?</h2>
      <label><input type="radio" name="q3" value="logic"> Science fairs, coding, or math clubs</label>
      <label><input type="radio" name="q3" value="business"> Entrepreneurship or sales activities</label>
      <label><input type="radio" name="q3" value="writing"> Debating, writing contests, or community service</label>
      <label><input type="radio" name="q3" value="handsOn"> Cooking, technical workshops, or athletic events</label>
    </div>

    <div class="question" data-qid="4">
      <h2>4. What is your future goal or dream?</h2>
      <label><input type="radio" name="q4" value="logic"> Engineer, Scientist, or IT Professional</label>
      <label><input type="radio" name="q4" value="business"> Business Owner, Accountant, or Marketer</label>
      <label><input type="radio" name="q4" value="writing"> Lawyer, Teacher, or Social Worker</label>
      <label><input type="radio" name="q4" value="handsOn"> Chef, Technician, or Skilled Worker</label>
    </div>

    <button type="submit" id="submitBtn" disabled>Get Recommendation</button>
  </form>

  <div id="result" role="region" aria-live="assertive" style="display:none;">
    <h2>Your Recommended Strand:</h2>
    <p id="recommendationText"></p>
  </div>
</div>

<script>
  (function(){
    const form = document.getElementById('questionForm');
    const submitBtn = document.getElementById('submitBtn');
    const resultDiv = document.getElementById('result');
    const recommendationText = document.getElementById('recommendationText');

    // Enable submit if all questions answered
    form.addEventListener('change', () => {
      const q1 = form.q1.value;
      const q2 = form.q2.value;
      const q3 = form.q3.value;
      const q4 = form.q4.value;
      if(q1 && q2 && q3 && q4){
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather answers and score strands
      const answers = {
        q1: form.q1.value,
        q2: form.q2.value,
        q3: form.q3.value,
        q4: form.q4.value
      };

      // Score object to record points for each strand
      const scores = {
        STEM: 0,
        ABM: 0,
        HUMSS: 0,
        TVL: 0
      };

      // Mapping answers to strand points
      // logic -> STEM
      // business -> ABM
      // writing -> HUMSS
      // handsOn -> TVL
      Object.values(answers).forEach(val => {
        switch(val){
          case 'logic':
            scores.STEM++;
            break;
          case 'business':
            scores.ABM++;
            break;
          case 'writing':
            scores.HUMSS++;
            break;
          case 'handsOn':
            scores.TVL++;
            break;
        }
      });

      // Find strand with highest score
      const maxScore = Math.max(...Object.values(scores));
      const recommendedStrands = Object.keys(scores).filter(key => scores[key] === maxScore);

      // Normally one strand is recommended, but if tie, show all possible
      let recText = '';
      if(recommendedStrands.length === 1){
        recText = getStrandDescription(recommendedStrands[0]);
      } else {
        recText = recommendedStrands.map(s => getStrandDescription(s)).join('\n\nOr\n\n');
      }

      // Display result
      recommendationText.textContent = recText;
      resultDiv.style.display = 'block';

      // Scroll result into view smoothly on mobile
      resultDiv.scrollIntoView({behavior: 'smooth'});
    });

    function getStrandDescription(strand){
      switch(strand){
        case 'STEM':
          return "STEM (Science, Technology, Engineering, and Mathematics): \nYou enjoy logical thinking, math, and science. This strand is ideal for students interested in engineering, IT, medicine, or research.";
        case 'ABM':
          return "ABM (Accountancy, Business, and Management): \nYou have a knack for business, money handling, and management. Ideal if you aim to pursue careers in business, marketing, accounting, or entrepreneurship.";
        case 'HUMSS':
          return "HUMSS (Humanities and Social Sciences): \nYou like writing, social issues, community service, and debate. This strand suits those interested in education, law, social work, communication, or journalism.";
        case 'TVL':
          return "TVL (Technical-Vocational-Livelihood): \nYou prefer hands-on activities such as cooking, technical skills, or crafts. This strand prepares students for technical careers, vocational jobs, or immediate employment.";
        default:
          return "Unable to determine your recommended strand.";
      }
    }
  })();
</script>
</body>
</html>