object "Calculator" {
  // Init code (constructor)
  code {
    let runtime_size := datasize("runtime")
    let runtime_offset :=  dataoffset("runtime")
    datacopy(0, runtime_offset, runtime_size) // Copy the data from 0 - Runtime object
    return(0, runtime_size) // Return the Runtime Object to the miner
  }

  // Runtime code (main contract)
  object "runtime" {
    code {
      // The `case` syntax stops after running in Yul (Dont need `break`)
      switch getSelector()

      // Function add (uint256, uint256)
      case 0x771602f7 {
        // Get First Number passed
        let val1 := calldataload(4)

        // Get the Second Number passed which is after 32 bytes + 4 bytes
        let val2 := calldataload(0x24)

        // Store the addition of sent numbers onto memory slot 0
        mstore(0, add(val1, val2))

        // Return 0 - 32bytes
        return(0, 0x20)
      }

      // Function subtract (uint256, uint256)
      case 0x3ef5e445 {
        // If the first number is greater than the second number , Store the two numbers passed into the memory slot 0
        if gt(calldataload(4), calldataload(0x24)) {mstore(0, sub(calldataload(4), calldataload(0x24)))}
        // If the first number is less than the second number , Store the substraction in reverse order into the memory slot 0
        if lt(calldataload(4), calldataload(0x24)) {mstore(0, sub(calldataload(0x24),calldataload(4)))}
        return(0, 0x20)
      }

      //* Function to Multiply two numbers
      // multiply(uint256,uint256)
      case 0x165c4a16 {
        // Store the multiplication of sent numbers onto memory slot 0
        mstore(0, mul(calldataload(4), calldataload(0x24)))
        return(0, 0x20)
      }

      //* Function to Multiply two numbers
      // divide(uint256,uint256)
      case 0xf88e9fbf {
        // If the first number is greater than the second number , Store the two numbers passed into the memory slot 0
        if gt(calldataload(4), calldataload(0x24)) {mstore(0, div(calldataload(4), calldataload(0x24)))}
        // If the first number is less than the second number , Store the substraction in reverse order into the memory slot 0
        if lt(calldataload(4), calldataload(0x24)) {mstore(0, div(calldataload(0x24),calldataload(4)))}
        return(0, 0x20)
      }

      // No fallback
      default {
        revert(0,0)
      }

      function getSelector() -> selector {
        selector := div(calldataload(0), 0x100000000000000000000000000000000000000000000000000000000)
      }
    }
  }
}