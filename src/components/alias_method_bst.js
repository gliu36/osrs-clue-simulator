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

export function alias_bst() {

    // Initialization:
    // Create arrays Alias and Prob, each of size n.
    // Create a balanced binary search tree T.
    // Insert n⋅pi into T for each probability i.
    // For j=1 to n−1:
    // Find and remove the smallest value in T; call it pl.
    // Find and remove the largest value in T; call it pg.
    // Set Prob[l]=pl.
    // Set Alias[l]=g.
    // Set pg:=pg−(1−pl).
    // Add pg to T. 
    // Let i be the last probability remaining, which must have weight 1.
    // Set Prob[i]=1.

    let item_probs = {}
    let item_bsts = {}

    // Implementation of Alias Method (bst for initialization/biased coin for generation)

    for (let k in clue_items) {
        item_probs[k] = generateProbabilities(clue_items[k])
        item_bsts[k] = new BST()
        let n = item_probs[k].length

        for (let f in item_probs[k]) {
            let fr = item_probs[k][f]
            
            item_bsts[k].insert(number(fr) * n)
        }
    }
    console.log(item_bsts)
    

    let root = item_bsts['hard'].getRoot()
    let result = []
    item_bsts['hard'].inorder(root, result)
    console.log(result)
    // console.log(item_bsts['hard'].getMaxNode(root))
    let x = item_bsts['hard'].remove(root, 0)
    console.log(x)


    console.log(item_probs)
}