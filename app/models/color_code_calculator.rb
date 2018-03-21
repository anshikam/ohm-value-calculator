class ColorCodeCalculator

  FIRST_DIGIT = {"Brown"=>1, "Red"=>2, "Orange"=>3, "Yellow"=>4, "Green"=>5, "Blue"=>6, "Violet"=>7, "Gray"=>8, "White"=>9}.with_indifferent_access

  SECOND_DIGIT = {"Black"=>0, "Brown"=>1, "Red"=>2, "Orange"=>3, "Yellow"=>4, "Green"=>5, "Blue"=>6, "Violet"=>7, "Gray"=>8,
                  "White"=>9}.with_indifferent_access

  MULTIPLIER = {"Black"=>1, "Brown"=>10, "Red"=>100, "Orange"=>1000, "Yellow"=>10000, "Green"=>100000, "Blue"=>1000000,
                "Violet"=>10000000, "Gray"=>100000000, "White"=>1000000000, "Gold"=>0.1, "Silver"=>0.01}.with_indifferent_access

  TOLERANCE = {"Brown"=>1, "Red"=>2, "Orange"=>3, "Yellow"=>4, "Green"=>0.5, "Blue"=>0.25, "Violet"=>0.1, "Gray"=>0.05, "Gold"=>5, "Silver"=>10}.with_indifferent_access

  def initialize(band_A, band_B, band_C, band_D)
    @band_a = band_A
    @band_b = band_B
    @band_c = band_C
    @band_d = band_D
  end

  def calculate
    @resistance = (FIRST_DIGIT[@band_a]*10 + SECOND_DIGIT[@band_b])*MULTIPLIER[@band_c]
    @tolerance = TOLERANCE[@band_d]
    @minimum = @resistance * (100.0000-@tolerance)/100.0000
    @maximum = @resistance * (100.0000+@tolerance)/100.0000
  end

  def to_hash
    { Resistance: @resistance, Tolerance: @tolerance, Minimum: @minimum, Maximum: @maximum }.with_indifferent_access
  end
end