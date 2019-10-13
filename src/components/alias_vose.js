// import { seedrandom, rng } from 'seedrandom'

// export function alias_vose(probabilities) {
//     // const r = generate_int()
//     // Will need ^ for seed generation eventually...
//     alias(probabilities)
// }

function generate_int(max = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * Math.floor(max))
}

export function alias(probabilities) {
    if (Array.isArray(probabilities) && probabilities.length)
        Error('Probability vector must be nonempty')
    
    // Prob and alias tables and average prob
    let alias = []
    let average = 1.0 / probabilities.length
    console.log(average)

    // let prob_temp = [...probabilities]

    // Create 2 stacks as worklists for populating tables
    let small = []
    let large = []

    // Fill stacks with input probs
    for (let i = 0; i < probabilities.length; ++i)
        probabilities[i] > average ? large.push(i) : small.push(i)

    // We will need to check that both lists aren't empty due to pointing point inaccuracies
    while (!small.length && !large.length) {
        let less = small.pop()
        let more = large.pop()

        // Scale up probs such that 1/n has weight 1.0
        probabilities[less] = probabilities[less] * probabilities.length
        alias[less] = more

        // Decrease prob of the larger on by appropriate amount
        probabilities[more] = probabilities[more] + probabilities[less] - average

        // If new prob is less than average, add to small else add to large
        probabilities[more] >= 1.0 / probabilities.length ? large.push(more) : small.push(more)

        console.log(probabilities, large, small)
    }

    // Everything should be in one list so that the remaining probs should be 1/n
    // Set probs approprately by emptying stacks
    while (!small.length)
        probabilities[small.pop()] = 1.0
    while (!large.length)
        probabilities[small.pop()] = 1.0

    // Sample a random selection from distribuction
    this.next = function() {
        // Generate fair dice roll to find column to inspect
        
        let column = generate_int(probabilities.length)
        // Generate biased coin toss for option selection. Then return either column or its alias
        let coin_toss = Math.random() < probabilities[column]

        console.log(column, probabilities, alias, coin_toss)

        
        return coin_toss ? column : alias[column]

    }
}