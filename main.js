/* 
* A Science exercise to simulate generating DNA specimens randomly and apply different methods on them from a factory object.
* Created by Sam Burch
*/

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (number, dna) => {
  return({
    specimenNum: number,
    dna,
    // Mutate the DNA of the first Specimen and create a new Specimen with the mutated DNA
    mutate() {     
      
      let mutation = returnRandBase();
      const rBase = dna[Math.floor(Math.random() * dna.length)]
      const rBaseIndex = dna.indexOf(rBase)

     while(mutation === rBase) {
        console.log(`Mutation ${mutation} same as Base ${rBase}, generating another Mutation`)
        mutation = returnRandBase();
      }

      console.log(`Mutating DNA strand: ${dna} with a random DNA mutation of ${mutation} of ${rBase} at ${rBaseIndex}`)
      dna.splice(rBaseIndex, 1, mutation);
      return `Muted to new DNA strand: ${dna}`

    },
    // Compare the DNA of a new pAequor Specimen with that of the first Specimen
    compareDNA(pAequor) {
      
      let total = 0
      for (let i = 0; i < dna.length; i ++) {
        if (pAequor.dna[i] === dna[i]) {
          total++;
        }
      }
      if (total === 0) {
        console.log(`There are no differences between both Specimens`)
      }
      let inCommon = Math.round((total / 15) * 100);
      return `Specimen #${this.specimenNum} and Specimen #${pAequor.specimenNum} have ${inCommon}% DNA in common = ${total} mutations`;
    },
    // Check the survival chance of the Specimen. C or G DNA bases should have a 60% survival chance
    willLikelySurvive() {

      let total = 0;
      for (let i = 0; i < dna.length; i++) {
        if (dna[i] === 'C' || dna[i] === 'G')
        total++
      }
      let survival = Math.round((total / dna.length * 100))
      if (survival >= 60) {
        console.log(`${survival}% Survival chance for this Specimen`)
        return true;
      } else {
        console.log(`Survival is unlikely at only ${survival}%`)
        return false;
      }

    }
  }
)};

// Test mutating the original DNA to a new DNA specimen
console.log(pAequorFactory(1, mockUpStrand()).mutate());

// Test comparing 1 pAuquor Specimen with another to see how many DNA strands they have in common
console.log(pAequorFactory(1, mockUpStrand()).compareDNA(pAequorFactory(2, mockUpStrand())));

// Test suvival chance of the specimen
console.log(pAequorFactory(1, mockUpStrand()).willLikelySurvive());
