import * as nearAPI from 'near-api-js';

class NEARUtils {
  // https://docs.near.org/tools/near-api-js/quick-reference#utils
  convertNEARToYoctoNEAR(value: number): string | null {
    // converts NEAR amount into yoctoNEAR (10^-24)
    return nearAPI.utils.format.parseNearAmount(value.toString());
  }
  convertYoctoNEARToNEAR(value: number): string {
    // converts yoctoNEAR (10^-24) amount into NEAR
    return nearAPI.utils.format.formatNearAmount(value.toString());
  }

  TGAS: number = 1000000000000;

  convertGasToTGAS(value: number): string {
    // converts NEAR amount into yoctoNEAR (10^-12)
    return (value * this.TGAS).toString();
  }
  convertTGASToGas(value: number): string {
    // converts yoctoNEAR (10^-12) amount into NEAR
    return (value / this.TGAS).toString();
  }
}

export default new NEARUtils();
