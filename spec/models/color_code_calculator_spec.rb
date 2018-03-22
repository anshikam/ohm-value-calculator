require "spec_helper"

RSpec.describe ColorCodeCalculator, :type => :model do
  context "when a band is blank or missing from list" do
    it "for the first band uses the first value in the list" do
      @calculator = ColorCodeCalculator.new(nil,"Black", "Silver", "Silver")
      @calculator.calculate
      expect(@calculator.resistance).to eq(0.1)
    end

    it "for the second band uses the first value in the list" do
      @calculator = ColorCodeCalculator.new("Yellow", nil, "Silver", "Silver")
      @calculator.calculate
      expect(@calculator.resistance).to eq(0.4)
    end

    it "for the third band uses the first value in the list" do
      @calculator = ColorCodeCalculator.new("Violet","Brown", nil, "Silver")
      @calculator.calculate
      expect(@calculator.resistance).to eq(71)
    end

    it "for the fourth band uses the first value in the list" do
      @calculator = ColorCodeCalculator.new("Red","Black", "Silver", nil)
      @calculator.calculate
      expect(@calculator.tolerance).to eq(1)
    end
  end

  context 'when all bands are present' do
    it 'calculates resistance and other values' do
      @calculator = ColorCodeCalculator.new("Orange", "Blue", "Silver", "Gold")
      @calculator.calculate
      expect(@calculator.resistance).to eq(0.36)
      expect(@calculator.tolerance).to eq(5)
      expect(@calculator.minimum).to eq(0.34199999999999997)
      expect(@calculator.maximum).to eq(0.37799999999999995)
    end
  end
end