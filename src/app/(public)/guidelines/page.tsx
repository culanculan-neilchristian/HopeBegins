import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12 bg-white dark:bg-zinc-900 p-8 md:p-14 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold font-poppins text-zinc-900 dark:text-zinc-100">
            HopeBegins Volunteer
            <br className="max-md:hidden" />
            <span className="text-[#a3b18a]">
              {' '}
              Code of Conduct and Guidelines
            </span>
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium pb-8 border-b border-zinc-100 dark:border-zinc-800/80 max-w-2xl mx-auto">
            Last updated: March 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-medium">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 font-poppins">
              1. Our Mission
            </h2>
            <p>
              HopeBegins exists to help individuals rediscover hope, purpose,
              and healing through a faith-centered and action-driven journey
              supported by community and technology.
            </p>
            <p>
              As a volunteer, you represent the heart of HopeBegins. Your role
              is to serve with compassion, humility, integrity, and faithfulness
              while helping people who may be experiencing anxiety,
              discouragement, or a loss of purpose.
            </p>
            <p className="font-bold text-[#6b634d] dark:text-[#a3b18a] bg-[#fcfdfa] dark:bg-zinc-950 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
              We believe that hope begins when people encounter truth, love, and
              a supportive community.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 font-poppins">
              2. Core Values for Every Volunteer
            </h2>
            <p>Every HopeBegins volunteer commits to the following values:</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                  Faith-Centered Service
                </h3>
                <p>We honor God in the way we serve others.</p>
                <p className="italic text-zinc-500 my-3 font-semibold">
                  “Serve one another humbly in love.”
                  <br />– Bible (Galatians 5:13)
                </p>
                <p className="text-sm text-zinc-500">
                  Our encouragement, guidance, and interactions should reflect
                  biblical wisdom, grace, and truth.
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                  Compassion Before Correction
                </h3>
                <p>Many people we serve are hurting. Volunteers must:</p>
                <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-zinc-500 mb-3">
                  <li>Listen first</li>
                  <li>Respond with empathy</li>
                  <li>Avoid judgment or condemnation</li>
                </ul>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                  We aim to restore hope, not create pressure or shame.
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                  Integrity and Honesty
                </h3>
                <p>
                  Volunteers must represent HopeBegins truthfully and ethically.
                  You should:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-zinc-500">
                  <li>Speak honestly</li>
                  <li>Avoid exaggerating claims</li>
                  <li>Respect confidentiality</li>
                  <li>Maintain moral and ethical conduct</li>
                </ul>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                  Humility in Service
                </h3>
                <p>
                  Serving at HopeBegins is not about recognition or influence.
                  It is about:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-zinc-500">
                  <li>Serving quietly</li>
                  <li>Supporting others</li>
                  <li>Reflecting Christ-like character</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mt-12 font-poppins">
              3. Volunteer Conduct Expectations
            </h2>
            <p>All volunteers agree to the following behavioral standards.</p>

            <div className="space-y-8 pl-4 border-l-2 border-zinc-100 dark:border-zinc-800">
              <div>
                <h4 className="text-lg font-bold text-[#a3b18a] dark:text-[#a3b18a]">
                  Respect and Dignity
                </h4>
                <p className="my-2">
                  Treat everyone with respect regardless of:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-500 text-base mb-3">
                  <li>Background</li>
                  <li>Struggles</li>
                  <li>Beliefs</li>
                  <li>Personal history</li>
                </ul>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                  We serve people with patience, grace, and dignity.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#a3b18a] dark:text-[#a3b18a]">
                  Confidentiality
                </h4>
                <p className="my-2">
                  Many participants may share personal struggles including
                  anxiety, depression, or life challenges. Volunteers must:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-500 text-base mb-3">
                  <li>Keep personal information confidential</li>
                  <li>Never share private stories without permission</li>
                  <li>
                    Avoid discussing participant situations outside approved
                    ministry contexts
                  </li>
                </ul>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                  Confidentiality protects trust and emotional safety.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#a3b18a] dark:text-[#a3b18a]">
                  Healthy Boundaries
                </h4>
                <p className="my-2">
                  Volunteers must maintain appropriate relational boundaries.
                  This includes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-500 text-base mb-3">
                  <li>Avoiding dependency or emotional over-involvement</li>
                  <li>Not presenting yourself as a therapist</li>
                  <li>Not giving medical or psychological diagnoses</li>
                  <li>
                    Directing individuals to professional help when necessary
                  </li>
                </ul>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                  HopeBegins volunteers encourage and guide, but do not replace
                  professional care.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#a3b18a] dark:text-[#a3b18a]">
                  Safe Communication
                </h4>
                <p className="my-2 text-zinc-800 dark:text-zinc-200 font-bold">
                  All communication should be: Respectful, Encouraging, and Free
                  from manipulation or coercion.
                </p>
                <p className="mb-2 mt-2">Volunteers must avoid:</p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-500 text-base">
                  <li>Harassment</li>
                  <li>Discrimination</li>
                  <li>Spiritual manipulation</li>
                  <li>
                    Romantic or inappropriate relationships with participants
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sections 4, 5, 6, 7 */}
          <section className="space-y-10">
            <div>
              <h2 className="text-2xl min-[400px]:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mt-12 font-poppins mb-4">
                4. Digital and AI Responsibility
              </h2>
              <p>
                HopeBegins utilizes technology and AI tools to support coaching
                and encouragement. Volunteers must:
              </p>
              <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                <li>Use digital tools responsibly</li>
                <li>Never misuse personal data</li>
                <li>Avoid generating misleading or harmful AI content</li>
                <li>Respect the privacy of all users</li>
              </ul>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                Technology should always be used to empower people, not exploit
                them.
              </p>
            </div>

            <div>
              <h2 className="text-2xl min-[400px]:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 font-poppins mb-4">
                5. Commitment to Spiritual Growth
              </h2>
              <p>
                HopeBegins volunteers are encouraged to maintain a healthy
                spiritual life. This includes:
              </p>
              <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                <li>Personal prayer</li>
                <li>Reading Scripture</li>
                <li>Being accountable in a Christian community</li>
                <li>Continuing to grow in character and faith</li>
              </ul>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                You cannot pour hope into others if you are not also being
                spiritually refreshed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl min-[400px]:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 font-poppins mb-4">
                6. Professionalism and Reliability
              </h2>
              <p>
                Volunteers must demonstrate commitment and responsibility. This
                includes:
              </p>
              <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                <li>Showing up on time</li>
                <li>Following program guidelines</li>
                <li>Completing assigned responsibilities</li>
                <li>Communicating clearly with team leaders</li>
              </ul>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                Reliability builds trust and excellence in ministry.
              </p>
            </div>

            <div>
              <h2 className="text-2xl min-[400px]:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 font-poppins mb-4">
                7. Social Media Guidelines
              </h2>
              <p>
                Volunteers represent HopeBegins both online and offline. Please
                ensure that:
              </p>
              <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                <li>Social media posts reflect Christian values</li>
                <li>
                  Personal opinions are not presented as official HopeBegins
                  statements
                </li>
                <li>Confidential information is never shared online</li>
              </ul>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                Your online presence should encourage hope and integrity.
              </p>
            </div>
          </section>

          {/* Section 8, 9, 10 */}
          <section className="space-y-10 pt-4">
            <div className="bg-rose-50 dark:bg-rose-950/30 p-8 md:p-10 rounded-3xl border border-rose-100 dark:border-rose-900/50 shadow-sm relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-rose-100 dark:text-rose-900/30 rotate-12">
                <ShieldAlert className="w-32 h-32" />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-rose-800 dark:text-rose-300 font-poppins flex items-center gap-3 mb-6">
                  <ShieldAlert className="w-8 h-8 shrink-0" />
                  8. Safety and Crisis Awareness
                </h2>

                <p className="text-rose-800 dark:text-rose-400 font-bold mb-2">
                  If a participant expresses:
                </p>
                <ul className="list-disc pl-5 mb-6 space-y-1 text-rose-700 dark:text-rose-300">
                  <li>suicidal thoughts</li>
                  <li>self-harm</li>
                  <li>danger to themselves or others</li>
                </ul>

                <p className="text-rose-800 dark:text-rose-400 font-bold mb-2 pt-2 border-t border-rose-200/50 dark:border-rose-900/50">
                  Volunteers must:
                </p>
                <ul className="list-disc pl-5 mb-6 space-y-1 text-rose-700 dark:text-rose-300">
                  <li>Stay calm and compassionate</li>
                  <li>
                    Immediately escalate the concern to a HopeBegins leader
                  </li>
                  <li>Encourage the person to seek professional help</li>
                </ul>
                <p className="mt-4 text-white bg-rose-600/90 dark:bg-rose-900 py-3 px-4 rounded-xl text-center font-bold text-sm shadow-sm border border-rose-700 dark:border-rose-800">
                  Volunteers should never attempt to manage crisis situations
                  alone.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-200 font-poppins mb-4">
                9. Accountability
              </h2>
              <p>Volunteers who violate this code of conduct may face:</p>
              <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                <li>Warning or corrective coaching</li>
                <li>Temporary suspension from volunteering</li>
                <li>Removal from the HopeBegins volunteer team</li>
              </ul>
              <p className="text-sm text-zinc-500 font-bold mt-4">
                This ensures the safety and integrity of the ministry.
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 py-10 px-6 md:px-12 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="w-16 h-16 text-[#a3b18a] dark:text-emerald-500/80" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-200 font-poppins mb-4">
                10. Volunteer Commitment
              </h2>
              <p className="text-emerald-900/80 dark:text-emerald-400/80 font-bold mb-8">
                By volunteering with HopeBegins, I commit to:
              </p>

              <ul className="space-y-4 text-left max-w-lg mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 mb-8">
                {[
                  'Serve with humility and compassion',
                  'Uphold Christian values in my conduct',
                  'Protect the confidentiality of participants',
                  'Maintain healthy boundaries',
                  'Support the mission of restoring hope',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-bold"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-emerald-800 dark:text-emerald-300 italic font-semibold border-t border-emerald-200/50 dark:border-emerald-900/50 pt-8 inline-block">
                I understand that serving with HopeBegins is both a privilege
                and a responsibility.
              </p>
            </div>
          </section>

          {/* Final Note */}
          <div className="pt-8 text-center max-w-3xl mx-auto space-y-6 pb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-[#6b634d] dark:text-[#a3b18a] font-poppins italic">
              HopeBegins is more than a program.
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl">
              It is a community of people committed to helping others rediscover
              hope, purpose, and healing.
            </p>
            <p className="text-zinc-800 dark:text-zinc-200 font-bold text-lg md:text-xl leading-relaxed">
              Your presence, encouragement, and faithfulness may be the moment
              where hope begins again for someone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
