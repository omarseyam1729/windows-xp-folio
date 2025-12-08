const About = () => {
  return (
    <div className="space-y-6 px-3 py-2 text-sm leading-relaxed select-none">
      {/* Title */}
      <h2 className="text-2xl font-bold text-xp-blue-700 drop-shadow-sm">
        About Me
      </h2>

      {/* Origin */}
      <div className="p-3 rounded-md border border-xp-gray-300 bg-xp-gray-50 shadow-inner text-xp-blue-900 space-y-2">
        <p>
          ~10 years ago I was manually approximating <code>sin(x)</code> with Taylor
          polynomials on paper. When I discovered neural networks, I realised I was
          still approximating transcendental functions, just delegating the algebra to
          GPUs and autodiff instead of notebooks and erasers.
        </p>
      </div>

      {/* Invariants + DSA */}
      <div className="p-3 rounded-md border border-xp-gray-300 bg-white shadow-sm text-gray-800 space-y-2">
        <p>
          My interests orbit algebraic invariants, representation epistemics, and the
          ontic behaviour of neural nets. I keep asking slightly unhinged questions:
          what does the Fourier transform of a trained network really encode? Could a
          continued fraction serve as an activation function, and what latent geometry
          would that impose?
        </p>
      </div>

      {/* Graphical modelling + counterfactuals */}
      <div className="p-3 rounded-md border border-xp-gray-300 bg-xp-gray-50 shadow-inner text-xp-blue-900 space-y-2">
        <p>
          I also explore graphical modelling and counterfactuals in conversational
          systems—thinking in terms of causal graphs rather than just token streams.
          Some of this lives inside proprietary dialogue-modelling software.
        </p>
      </div>

      {/* Synthetic data */}
      <div className="p-3 rounded-md border border-xp-gray-300 bg-white shadow-sm text-gray-800 space-y-2">
        <p>
          Synthetic data is another rabbit hole especially privacy preserving setups
          like PATE-GAN. The trade-off between marginal fidelity, relational
          coherence, and privacy budgets feels like an evolving combinatorial puzzle,
          which is probably why it amuses me more than it should.
        </p>
      </div>

      {/* Closing */}
      <div className="p-3 rounded-md border border-xp-gray-300 bg-xp-gray-100 shadow-inner text-gray-900 space-y-2">
        <p>
          Practically, I build scalable inference systems and distributed ML
          pipelines that try to bake these mathematical obsessions into real
          infrastructure. 
        </p>
      </div>
    </div>
  )
}

export default About
