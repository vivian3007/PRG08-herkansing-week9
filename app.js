const nn = ml5.neuralNetwork({task: 'regression'})
nn.load('model/model.json', modelLoaded)

async function modelLoaded() {
    console.log("the model was loaded!")
}

let predictButton = document.getElementById('predict')
predictButton.addEventListener('click', ev => predict(ev))

async function predict(ev) {
    let lengthValue = document.getElementById('length').value;
    let diameterValue = document.getElementById('diameter').value;
    let heightValue = document.getElementById('height').value;
    let weightValue = document.getElementById('weight').value;
    let shuckedWeightValue = document.getElementById('shuckedWeight').value;
    let visceraWeightValue = document.getElementById('visceraWeight').value;
    let shellWeightValue = document.getElementById('shellWeight').value;

    const result = await nn.predict({
        length: parseInt(lengthValue),
        diameter: parseInt(diameterValue),
        height:parseInt(heightValue),
        weight: parseInt(weightValue),
        shuckedWeight: parseInt(shuckedWeightValue),
        visceraWeight: parseInt(visceraWeightValue),
        shellWeight: parseInt(shellWeightValue)
    })

    const predictedAge = result[0].value;

    //calculate years and months
    const years = Math.floor(predictedAge);
    const months = Math.round((predictedAge - years) * 12);

    //show the predicted age in years and months
    if(predictedAge){
        let prediction = document.getElementById('prediction');
        prediction.innerHTML = `The predicted age is: ${years} years and ${months} months.`;
    } else{
        let prediction = document.getElementById('prediction')
        prediction.innerHTML = `Fill in the form first!`;
    }

}
