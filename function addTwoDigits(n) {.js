function addTwoDigits(n) {
    toString = n.toString();
    console.log(toString);
    let total = 0;
    toString.forEach(letter => (
       total += (parseInt(letter))
    ))
}
