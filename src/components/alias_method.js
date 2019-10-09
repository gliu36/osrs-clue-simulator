import clue_items from './data/clue_scroll_data.json'
import { number, fraction, add } from 'mathjs'
import BST from './bst'




function generateProbabilities(items) {
	let prob_list = []
    let total_prob = number(0)
    
	for (let k in items) {
		let d_r = items[k]['drop_rate'].replace(/,/,'')
        let pattern = /(\d+\.?\d*)\/(\d+\.?\d*)/
        
		if (pattern.test(d_r)) {
			let d = d_r.match(pattern)
			let frac = fraction(d[1],d[2])

			prob_list.push(frac)
			total_prob = add(total_prob, frac)

		} else {
			prob_list.push(number(0))
		}
    }
    
	console.log(number(total_prob))
    return prob_list
}

export function alias() {
    let item_probs = {}
    for (let k in clue_items) {
        item_probs[k] = generateProbabilities(clue_items[k])
        
    }
    console.log(item_probs['beginner'])
    // Implementation of Alias Method (bst for initialization/biased coin for generation)

    
    let bst = new BST()
    for (let f in item_probs['beginner']) {
        let n = item_probs['beginner'][f]
        bst.insert(number(n))
    }
    let root = bst.getRoot()
    let result = []
    bst.inorder(root, result)
    console.log(result)


    console.log(item_probs)
}