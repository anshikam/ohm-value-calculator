class OhmValueCalculatorController < ApplicationController

  def index

  end

  def calculate
    band_A = params['colors'][0]
    band_B = params['colors'][1]
    band_C = params['colors'][2]
    band_D = params['colors'][3]
    calculator = ColorCodeCalculator.new(band_A, band_B, band_C, band_D)
    calculator.calculate
    respond_to do |format|
      format.json do
        render json: calculator.to_hash
      end
    end
  end
end