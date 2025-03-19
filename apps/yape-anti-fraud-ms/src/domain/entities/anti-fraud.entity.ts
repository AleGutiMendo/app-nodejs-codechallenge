export class AntiFraudTransaction {
  constructor(
    public readonly id: string,
    public readonly value: number,
  ) {}

  isFraudulent(threshold: number): boolean {
    return this.value > threshold;
  }
}
